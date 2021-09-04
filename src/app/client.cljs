(ns app.client
  (:require
   [uix.dom.alpha :refer (hydrate)]
   [app.main :refer (app)]))

(defn render [node]
  (hydrate [app] node))
