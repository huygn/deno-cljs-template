(ns app.main
  (:require [uix.core.alpha :as uix]))

(defn button [{:keys [on-click]} text]
  [:button.btn {:on-click on-click
                :style {:margin "4px"}}
   text])

(defn app []
  (let [state* (uix/state 0)]
    [:<>
     [button {:on-click #(swap! state* dec)} "-"]
     [:span @state*]
     [button {:on-click #(swap! state* inc)} "+"]]))
