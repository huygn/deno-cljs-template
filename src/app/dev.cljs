(ns app.dev
  (:require
   [uix.dom.alpha :as uix.dom]))

(defn render [component node]
  (uix.dom/render [component] node))

(defn unmount [node]
  (uix.dom/unmount-at-node node))

(defn ^:dev/after-load start []
  (.__devReload js/window))
