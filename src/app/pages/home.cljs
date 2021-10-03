(ns app.pages.home
  (:require
   [app.lib :refer [defc]]
   [app.main :refer [button]]
   [helix.core :refer [$]]
   [helix.hooks :as h]))

(defc page []
  (let [[count set-count] (h/use-state 0)]
    [:*
     [:h1 "Home page"]
     [:div
      ($ button {:on-click #(set-count dec)} "-")
      [:span count]
      ($ button {:on-click #(set-count inc)} "+")]]))
