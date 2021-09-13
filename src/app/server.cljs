(ns app.server
  (:require
   [app.shared :refer [get-page]]
   [app.pages.layout :refer [layout]]
   ["react-dom/server" :as ReactDOMServer]
   [helix.core :refer [$]]))

(defn render [page]
  (ReactDOMServer/renderToString ($ layout ($ (get-page page)))))
