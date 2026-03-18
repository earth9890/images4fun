"use client";

import { useHash } from "@/hooks/use-hash";
import { CompressionProvider } from "@/context/compression-context";
import { CropProvider } from "@/context/crop-context";
import { MergeProvider } from "@/context/merge-context";
import { ConvertProvider } from "@/context/convert-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { HomeView } from "@/components/home/home-view";
import { CompressView } from "@/components/compress/compress-view";
import { CropView } from "@/components/crop/crop-view";
import { MergeView } from "@/components/merge/merge-view";
import { ConvertView } from "@/components/convert/convert-view";
import { AboutView } from "@/components/pages/about-view";
import { PrivacyView } from "@/components/pages/privacy-view";
import { TermsView } from "@/components/pages/terms-view";

function CompressRoute({ hash }: { hash: string }) {
  const showCompare = hash === "#/compress/compare";
  return <CompressView showCompare={showCompare} />;
}

export function App() {
  const [hash, setHash] = useHash();

  const isCompress = hash.startsWith("#/compress");
  const isCrop = hash === "#/crop";
  const isMerge = hash === "#/merge";
  const isConvert = hash === "#/convert";
  const isAbout = hash === "#/about";
  const isPrivacy = hash === "#/privacy";
  const isTerms = hash === "#/terms";
  const isTool = isCompress || isCrop || isMerge || isConvert;
  const isHome = !isTool && !isAbout && !isPrivacy && !isTerms;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-surface)]">
      <Header currentRoute={hash} onNavigate={setHash} />
      <div className="flex flex-1">
        {isCompress ? (
          <CompressionProvider>
            <CompressRoute hash={hash} />
          </CompressionProvider>
        ) : isCrop ? (
          <CropProvider>
            <CropView />
          </CropProvider>
        ) : isMerge ? (
          <MergeProvider>
            <MergeView />
          </MergeProvider>
        ) : isConvert ? (
          <ConvertProvider>
            <ConvertView />
          </ConvertProvider>
        ) : isAbout ? (
          <AboutView />
        ) : isPrivacy ? (
          <PrivacyView />
        ) : isTerms ? (
          <TermsView />
        ) : (
          <HomeView onNavigate={setHash} />
        )}
      </div>
      {isTool && <MobileNav currentRoute={hash} onNavigate={setHash} />}
      <Footer onNavigate={setHash} />
    </div>
  );
}
