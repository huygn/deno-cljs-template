(ns app.client
  (:require
   [uix.dom.alpha :as uix.dom]
   [app.pages.layout :refer (layout)]
   ["internal-nav-helper" :refer (getNavHelper)]))

(defn hydrate [component node]
  (uix.dom/hydrate [layout [component]] node))

(defn render [component node]
  (uix.dom/render [layout [component]] node))

(defn unmount [node]
  (uix.dom/unmount-at-node node))

(def get-nav-helper getNavHelper)

(defn ^:dev/after-load start []
  (.__devReload js/window))
