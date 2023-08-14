import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select<string> onChange={handleChangeLanguage} defaultValue="en">
      <Option value="en">English</Option>
      <Option value="es">Español</Option>
    </Select>
  );
};
