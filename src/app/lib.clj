(ns app.lib
  (:require [helix.core :as helix]))

(def features {:fast-refresh true
               :check-invalid-hooks-usage true})

(defmacro defnc [type params & body]
  (let [[docstring params body] (if (string? params)
                                  [params (first body) (rest body)]
                                  [nil params body])
        opts? (map? (first body)) ;; whether an opts map was passed in
        opts (if opts? (first body) {})
        body (if opts? (rest body) body)
        ;; feature flags to enable by default
        default-opts {:helix/features features}]
    `(helix/defnc ~type ~@(when docstring [docstring]) ~params
       ;; we use `merge` here to allow indidivual consumers to override feature
       ;; flags in special cases
       ~(merge default-opts opts)
       ~@body)))
