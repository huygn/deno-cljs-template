(ns app.main
  (:require [uix.core.alpha :as uix]
            ["react" :as react]
            ["react-dom" :as react-dom]))

(js/goog.exportSymbol "React" react)
(js/goog.exportSymbol "ReactDOM" react-dom)
(js/goog.object.set react "DOM" react-dom)

(defn button [{:keys [on-click]} text]
  [:button.btn {:on-click on-click
                :style {:margin "4px"}}
   text])
