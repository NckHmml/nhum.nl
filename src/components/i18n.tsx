import { useTranslation } from "react-i18next";

interface Props {
  children: string;
  options?: Dictionary<string | number>;
}

const I18N: React.FC<Props> = ({ children, options }) => {
  const { t } = useTranslation();
  return <>{t(children, options)}</>;
};

export default I18N;