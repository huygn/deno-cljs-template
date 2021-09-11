(ns app.client
  (:require
   [uix.dom.alpha :as uix.dom]))

(defn hydrate [component node]
  (uix.dom/hydrate [component] node))
