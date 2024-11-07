import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../services/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../../../services/AIModal";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format.  **Return an array of JSON objects with 'summary' and 'experience_level' fields.**";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInforContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAIGeneratedSummeryList] = useState([]);

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobtitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);

    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));

    setAIGeneratedSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        enableNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add summery</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="border-primary text-primary flex gap-2"
              onClick={() => GenerateSummeryFromAI()}
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            defaultValue={summery ? summery : resumeInfo?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className=" mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <button onClick={() => handleClick(item?.summary)}>
                <p>{item?.summary}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
