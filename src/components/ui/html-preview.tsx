import { formatNb } from "@/config/functions";
import typedocStore from "@/store/typeDoc";
import { useEffect, useRef, useState } from "react";

const HtmlPreview = ({
  idType,
  totaux,
  frais,
}: {
  idType: number;
  totaux: number;
  frais: number;
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { getTypeDoc } = typedocStore();
  const [htmlContent, setHtmlContent] = useState<string>("");
  // Récupérer le fichier HTML
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTypeDoc(idType);
        setHtmlContent(
          response.model
            .replace("{{totaux}}", formatNb(totaux))
            .replace("{{frais}}", formatNb(frais))
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [idType, totaux, frais]);

  // Injecter le contenu dans l'iframe une fois qu'il est prêt
  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(htmlContent);
        iframeDocument.close();
      }
    }
  }, [htmlContent]);

  return (
    <div>
      <iframe ref={iframeRef} className="w-full h-[80vh]" title="HTML Viewer" />
    </div>
  );
};

export default HtmlPreview;
