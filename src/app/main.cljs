(ns app.main
  (:require
   [app.lib :refer [defnc]]
   [helix.dom :as d]))

(defnc button [{:keys [on-click children]}]
  (d/button {:on-click on-click
             :style {:margin "4px"}}
            children))
