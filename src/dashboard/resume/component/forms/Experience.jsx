import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../services/GlobalApi";
import { toast } from "sonner";

function Experience() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState([
    {
      title: "",
      companyName: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      workSummery: "",
    },
  ]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInforContext);
  useEffect(() => {
    console.log(resumeInfo);
    resumeInfo?.Experience?.length > 0 &&
      setExperienceList(resumeInfo?.Experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };
  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };
  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experienceList,
    });
  }, [experienceList]);
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    console.log("Data sent to Strapi:", JSON.stringify(data, null, 2));

    GlobalApi.UpateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Details Updated !");
      },
      (error) => {
        setLoading(false);
        toast.error("server error please try again");
        console.log(error);
      }
    );
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your last job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  {/* {Work Summery} */}
                  <RichTextEditor
                    index={index}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                    defaultValue={item?.workSummery}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={AddNewExperience}
              variant="outline"
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              onClick={RemoveExperience}
              variant="outline"
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          {/* <Button>Save</Button> */}
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
