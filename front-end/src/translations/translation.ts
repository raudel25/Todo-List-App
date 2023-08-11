import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "The new TODO is empty": "The new TODO is empty",
      "Add new Todo": "Add new Todo",
      Add: "Add",
      Search: "Search",
      Filter: "Filter",
      Cant: "Cant",
      Complete: "Check",
      "You want delete this TODO": "You want delete this TODO",
      "The edited TODO has not been saved. ":
        "The edited TODO has not been saved. ",
      "You want to mark this TODO as complete":
        "You want to mark this TODO as complete",
      Create: "Create",
      Confirmation: "Confirmation",
    },
  },
  es: {
    translation: {
      "The new TODO is empty": "El nuevo TODO está vacío",
      "Add new Todo": "Añadir nuevo TODO",
      Add: "Añadir",
      Search: "Buscar",
      Filter: "Filtrar",
      Cant: "Cantidad",
      Complete: "Completado",
      "You want delete this TODO": "Quiere borrar este TODO",
      "The edited TODO has not been saved. ":
        "El TODO editado no se ha guardado. ",
      "You want to mark this TODO as complete":
        "Quiere marcar este TODO como completado",
      Create: "Creado",
      Confirmation: "Confirmación",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
