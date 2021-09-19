(ns app.pages.about
  (:require
   [app.lib :refer [defnc]]
   [helix.core :refer [<>]]
   [helix.dom :as d]))

(defnc page []
  (<>
   (d/h1 "About page")))
