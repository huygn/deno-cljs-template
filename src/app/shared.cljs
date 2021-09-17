(ns app.shared
  (:require
   [clojure.string :as str]
   [helix.core :refer [$]]
   [app.pages.layout :refer [layout]]))

(defn path->name [path]
  (let [[_ & tokens] (str/split path #"/")]
    (case tokens
      nil
      :home

      ["about"]
      :about

      nil)))

(defn final-page [component]
  ($ layout ($ component)))
