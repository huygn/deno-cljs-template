(ns app.shared
  (:require
   [clojure.string :as str]
   [helix.core :refer [$]]
   [app.pages.layout :refer [layout]]))

(defn name-from-path [path]
  (let [[_ & tokens] (str/split path #"/")]
    (case tokens
      nil
      :home

      ["about"]
      :about

      nil)))

(defn final-page [component]
  ($ layout ($ component)))
