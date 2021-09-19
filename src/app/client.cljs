(ns app.client
  (:require ["react-dom" :as rdom]
            ["internal-nav-helper" :refer (getNavHelper)]
            [app.shared :refer [final-page path->name]]
            [shadow.lazy :as lazy]))

(defn hydrate [component node]
  (rdom/hydrate (final-page component) node))

(defn render [component node]
  (rdom/render (final-page component) node))

(defonce pages-map
  {:home
   (lazy/loadable app.pages.home/page)

   :about
   (lazy/loadable app.pages.about/page)})

(defn load-page [path]
  (-> (path->name path)
      pages-map
      (lazy/load)))

(defn get-root []
  (.getElementById js/document "root"))

(defn navigate! [path]
  (-> (load-page path)
      (.then #(render % (get-root)))
      (.then #(.pushState js/history nil nil path))))

(defn inject-nav! []
  ;; change page on relative link clicks
  (.addEventListener (get-root) "click" (getNavHelper navigate!))
  ;; change page on browser back/forward
  (js/addEventListener
   "popstate"
   #(-> js/document
        (.-location)
        (.-pathname)
        (load-page)
        (.then (fn [page] (render page (get-root)))))))

(defn init! []
  (js/addEventListener
   "DOMContentLoaded"
   (fn []
     (let [url (js/URL. js/location.href)]
       (-> (load-page (.-pathname url))
           (.then #(hydrate % (get-root)))
           (.then #(inject-nav!)))))))
