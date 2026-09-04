import { Component, type ErrorInfo, type ReactNode } from "react";
import { withTranslation, type WithTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";

type Props = WithTranslation & { children: ReactNode };
type State = { failed: boolean };

/** Last resort: a render error shows a plain message instead of a blank page. */
class Boundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    const { t } = this.props;
    return (
      <Container className="py-16 md:py-24">
        <div className="max-w-prose">
          <h1 className="text-display">{t("error.heading")}</h1>
          <p className="mt-6 text-platinum/90">{t("error.body")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/" variant="secondary">
              {t("buttons.backHome")}
            </ButtonLink>
            <ButtonLink to={SITE.telegramUrl} variant="secondary">
              {t("buttons.messageAdmin")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    );
  }
}

export const ErrorBoundary = withTranslation()(Boundary);
