(ns app.pages.layout
  (:require
   [app.lib :refer [defnc]]
   [helix.core :refer [<>]]
   [helix.dom :as d]))

(defnc layout [{:keys [children]}]
  (<>
   (d/header
    (d/nav
     (d/a {:href "/" :style {:margin-right "8px"}} "Home")
     (d/a {:href "/about"} "About")))
   children))
