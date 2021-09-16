(ns app.client
  (:require ["react-dom" :as rdom]
            ["internal-nav-helper" :refer (getNavHelper)]
            [helix.core :refer [$]]
            [app.pages.layout :refer [layout]]
            [shadow.lazy :as lazy]
            [clojure.string :as str]))

(defn wrapped-page [component]
  ($ layout ($ component)))

(defn hydrate [component node]
  (rdom/hydrate (wrapped-page component) node))

(defn render [component node]
  (rdom/render (wrapped-page component) node))

(defn load-page! [path]
  (let [[_ & tokens] (str/split path #"/")]
    (case tokens
      nil
      (-> (lazy/loadable app.pages.home/page)
          (lazy/load))

      ["about"]
      (-> (lazy/loadable app.pages.about/page)
          (lazy/load)))))

(defn get-root []
  (.getElementById js/document "root"))

(defn navigate! [path]
  (-> (load-page! path)
      (.then #(render % (get-root)))
      (.then #(.pushState js/history nil nil path))))

(defn inject-navigate []
  (let [root (get-root)]
    ;; change page on relative link clicks
    (.addEventListener root "click" (getNavHelper navigate!))
    ;; change page on browser back/forward
    (js/addEventListener
     "popstate"
     #(-> js/document (.-location) (.-pathname)
          (load-page!)
          (.then (fn [page] (render page root)))))))

(defn init! []
  (js/addEventListener
   "DOMContentLoaded"
   (fn []
     (let [url (js/URL. js/location.href)]
       (-> (load-page! (.-pathname url))
           (.then #(hydrate % (get-root)))
           (.then #(inject-navigate)))))))
