(ns app.client
  (:require ["react-dom" :as rdom]
            ["internal-nav-helper" :refer (getNavHelper)]
            [helix.core :refer [$]]
            [app.pages.layout :refer [layout]]))

(defn wrapped-page [component]
  ($ layout ($ component)))

(defn hydrate [component node]
  (rdom/hydrate (wrapped-page component) node))

(defn render [component node]
  (rdom/render (wrapped-page component) node))

(def get-nav-helper getNavHelper)
