export default function HtmlViewer({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="w-[80vw]">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
