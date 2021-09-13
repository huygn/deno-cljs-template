(ns app.pages.home
  (:require
   [app.lib :refer [defnc]]
   [app.main :refer [button]]
   [helix.core :refer [$ <>]]
   [helix.dom :as d]
   [helix.hooks :as h]))

(defnc page []
  (let [[count,set-count] (h/use-state 0)]
    (<>
     (d/h1 "Home page")
     (d/div
      ($ button {:on-click #(set-count dec)} "-")
      (d/span count)
      ($ button {:on-click #(set-count inc)} "+")))))
