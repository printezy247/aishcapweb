import { useTranslation } from "react-i18next";
import { SubNav } from "@/components/product/SubNav";
import { ProductHero } from "@/components/product/ProductHero";
import { Performance } from "@/components/product/Performance";
import { Steps } from "@/components/product/Steps";
import { Fees } from "@/components/product/Fees";
import { Footnotes } from "@/components/Footnotes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CT1 } from "@/config/track-record";

/**
 * The product page: Overview · Performance · How it works · Fees, with a
 * sticky sub-nav and one gold pill. Every figure comes from the same
 * TrackRecord as the home hero; nothing on this page is typed by hand.
 */
export default function CopyTrading() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.titles.copyTrading"));
  const record = CT1;
  return (
    <>
      <SubNav />
      <ProductHero record={record} />
      <Performance record={record} />
      <Steps />
      <Fees record={record} />
      <Footnotes only={[1, 2]} />
    </>
  );
}
