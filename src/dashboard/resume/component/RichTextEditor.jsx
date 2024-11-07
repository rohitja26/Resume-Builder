import { Button } from "@/components/ui/button";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  Separator,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
("react-simple-wysiwyg");
import { toast } from "sonner";
import { AIChatSession } from "./../../../../services/AIModal";

const PROMPT =
  "Position title: positionTitle. Provide 5-7 bullet points about my experience in resume for this position, formatted as HTML list items (`<li>` tags only) without JSON or any data structure or any quotes. Please exclude experience level details.";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInforContext);
  const [loading, setLoading] = useState(false);
  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.Experience[index]?.title) {
      toast.error("Please Add Position Title");
      return;
    }
    setLoading(true);

    const prompt = PROMPT.replace(
      "positionTitle",
      resumeInfo?.Experience[index]?.title
    );
    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Work Summery</label>
        <Button
          onClick={GenerateSummeryFromAI}
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {" "}
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          defaultValue={defaultValue ? defaultValue : resumeInfo?.workSummery}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
