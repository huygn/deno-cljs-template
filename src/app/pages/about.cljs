(ns app.pages.about
  (:require [uix.core.alpha :as uix]
            [app.main :refer (button)]))

(defn page []
  (let [state* (uix/state 0)]
    [:<>
     [:h1 "About page"]
     [button {:on-click #(swap! state* dec)} "-"]
     [:span @state*]
     [button {:on-click #(swap! state* inc)} "+"]]))