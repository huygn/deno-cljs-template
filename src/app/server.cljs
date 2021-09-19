(ns app.server
  (:require
   [app.shared :refer [path->name final-page]]
   [app.pages.home :refer (page) :rename {page home}]
   [app.pages.about :refer (page) :rename {page about}]
   ["react-dom/server" :as ReactDOMServer]))

(defonce pages-map
  {:home home
   :about about})

(defn path->page [path]
  (-> (path->name path) pages-map))

(defn render [path]
  (when-let [page (path->page path)]
    (ReactDOMServer/renderToString (final-page page))))
