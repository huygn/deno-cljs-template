(ns app.client
  (:require
   [uix.dom.alpha :refer (render hydrate unmount-at-node)]
   [app.main :refer (app)]))

(defn hydrate-app [node]
  (hydrate [app] node))

(defn render-app []
  (render [app] (.getElementById js/document "root")))

(defn unmount-app []
  (unmount-at-node (.getElementById js/document "root")))

(defn ^:dev/before-load stop []
  (unmount-app))

(defn ^:dev/after-load start []
  (render-app))
