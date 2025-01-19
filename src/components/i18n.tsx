import { Trans, useTranslation } from "react-i18next";

interface Props {
  children: string;
  options?: Dictionary<string | number>;
  withHtml?: boolean;
}

const I18N: React.FC<Props> = ({ children, options, withHtml }) => {
  const { t } = useTranslation();

  if (withHtml) {
    return <Trans i18nKey={children} {...options} />;
  }
  return <>{t(children, options)}</>;
};

export default I18N;