"use client";
import { SourceHandlerEnum } from "@/utils/enums";
import { isValidUrl } from "@/utils/helperFunctions";
import axios from "axios";
import React, { useState } from "react";
import { FaComments, FaFilePdf, FaGlobe, FaTrash } from "react-icons/fa";
import { FaArrowUpFromBracket, FaLeaf } from "react-icons/fa6";
import { toast } from "react-toastify";

type SourceDataType = {
  files: File[] | null;
  text: string | null;
  websites: string[] | null;
  QAndAs:
    | {
        question: string;
        answer: string;
      }[]
    | null;
};

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(SourceHandlerEnum.FILES);
  const [data, setData] = useState<SourceDataType>({
    files: null,
    QAndAs: null,
    text: null,
    websites: null,
  });

  const MakeSetValue = (key: keyof SourceDataType) => {
    return (val: any) => {
      setData((prev) => ({
        ...prev,
        [key]: val,
      }));
    };
  };

  const AddToLocalStorage = (source: SourceDataType) => {
    const data: any = {};
    if(source.files && source.files.length > 0) data["files"] = true;
    if(source.text && source.text.length > 0) data["text"] = true;
    if(source.websites && source.websites.length > 0) data["websites"] = true;
    if(source.QAndAs && source.QAndAs.length > 0) data["QAndAs"] = true;
    localStorage.setItem("sourceData", JSON.stringify(data));
  }
  const handleSourceSubmit = () => {
    const uploadURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_sources`;
    const formdata = new FormData();
    if (data.files && data.files.length > 0) {
      for (let i = 0; i < data.files?.length; i++) {
        formdata.append("files", data.files[i]);
      }
    }
    if (data.text) formdata.append("text", data.text);
    if (data.QAndAs && data.QAndAs.length > 0)
      formdata.append("qNa", JSON.stringify(data.QAndAs));
    if (data.websites && data.websites.length > 0)
      formdata.append("links", JSON.stringify(data.websites));
    
    AddToLocalStorage(data);

    const toastId = toast.loading("Uploading sources...");

    axios.post(uploadURL, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      localStorage.setItem('sourceData', JSON.stringify(res.data.text));
      toast.update(toastId, {
        render: "Sources uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 400,})

    }).catch((err)=>{
      console.error(err);
      toast.update(toastId, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 400,
      });
    })
  }

  const tabs = [
    {
      name: SourceHandlerEnum.FILES,
      content: (
        <FileHandler value={data.files} setValue={MakeSetValue("files")} />
      ),
      icon: <FaFilePdf />,
    },
    {
      name: SourceHandlerEnum.TEXT,
      content: (
        <TextHandler value={data.text} setValue={MakeSetValue("text")} />
      ),
      icon: <FaLeaf />,
    },
    {
      name: SourceHandlerEnum.WEBSITE,
      content: (
        <WebsiteHandler
          value={data.websites}
          setValue={MakeSetValue("websites")}
        />
      ),
      icon: <FaGlobe />,
    },
    {
      name: SourceHandlerEnum.QANDA,
      content: (
        <QandAHandler value={data.QAndAs} setValue={MakeSetValue("QAndAs")} />
      ),
      icon: <FaComments />,
    },
  ];
  return (
    <div className="mx-auto w-full max-w-7xl px-4 grid grid-cols-12 gap-10 h-full">
      <ul className="space-y-1 col-span-12 lg:col-span-2">
        {tabs.map((tab) => (
          <li key={tab.name} onClick={() => setSelectedTab(tab.name)}>
            <div
              className={`cursor-pointer hover:bg-zinc-50 hover:text-violet-600 group flex items-center gap-x-1 rounded-md p-2 text-sm font-semibold leading-6 ${
                selectedTab == tab.name
                  ? "bg-zinc-50 text-violet-600"
                  : "text-zinc-700"
              }`}
            >
              {tab.icon}
              {tab.name}
            </div>
          </li>
        ))}
      </ul>
      <div className="right-side-content-wraper col-span-12 lg:col-span-10 flex flex-col gap-4 h-full">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`${selectedTab == tab.name ? "max-h-[70%] overflow-auto ScrollbarStyling" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}

        <div className="flex justify-end gap-2 items-center">
          <p className="text-gray-500 text-sm">{`* Submit button submits data all at once`}</p>
          <button className="text-sm text-white bg-violet-500 rounded px-4 py-1" onClick={handleSourceSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const FileHandler = ({
  value,
  setValue,
}: {
  value: SourceDataType["files"];
  setValue: (val: SourceDataType["files"]) => void;
}) => {
  return (
    <div className="flex flex-col rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm p-6 gap-6">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Files
        </h3>
      </div>
      <div className="">
        <label htmlFor="choosefile" className="cursor-pointer">
          <div className="border rounded border-neutral-200 p-16 hover:bg-zinc-100">
            <div className="flex flex-col items-center justify-center gap-4">
              <FaArrowUpFromBracket />
              <div className="items-center justify-center text-center">
                <p className="text-sm text-zinc-600">Click to select files</p>
                <span
                  className="text-xs text-zinc-500 dark:text-zinc-300"
                  id="file_type_help"
                >
                  Supported File Types: .pdf, .doc, .docx, .txt
                </span>
              </div>
            </div>
            <input
              id="choosefile"
              type="file"
              className="hidden"
              accept=".pdf, .doc, .docx, .txt"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                let vals: typeof value = [];
                if (value) vals = [...value];
                if (files) {
                  for (let i = 0; i < files.length; i++) {
                    vals.push(files[i]);
                  }
                }
                setValue(vals);
              }}
            />
          </div>
        </label>
      </div>
      {value && (
        <div className="flex flex-col w-full gap-2">
          {value.map((val, ind) => {
            return (
              <ItemCard
                key={ind}
                name={val?.name ?? ""}
                handleDelete={() => {
                  setValue(value.filter((_, idx) => ind != idx));
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const TextHandler = ({
  value,
  setValue,
}: {
  value: SourceDataType["text"];
  setValue: (val: SourceDataType["text"]) => void;
}) => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Text
        </h3>
      </div>
      <div className="p-6 pt-0">
        <textarea
          placeholder="Enter text ..."
          rows={10}
          className="my-2 w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white p-1 px-3 text-zinc-900 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 sm:text-sm"
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

const WebsiteHandler = ({
  value,
  setValue,
}: {
  value: SourceDataType["websites"];
  setValue: (val: SourceDataType["websites"]) => void;
}) => {
  const [newWebsite, setNewWebsite] = useState("");

  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Website
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div>
          <label className="my-2 block text-sm font-medium leading-6 text-zinc-900">
            Add website link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="flex flex-col gap-2 lg:flex-row">
              <input
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://www.example.com"
                type="text"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-800/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-1"
                onClick={() => {
                  if (isValidUrl(newWebsite)) {
                    setValue([...(value ?? []), newWebsite]);
                    setNewWebsite("");
                  }
                }}
              >
                Add link
              </button>
            </div>
          </div>
          {value && value.length > 0 && (
            <div className="mt-8">
              <div className="my-4 flex items-center">
                <hr className="w-full border-t border-zinc-300" />
                <span className="whitespace-nowrap px-2 text-zinc-600">
                  Included Links
                </span>
                <hr className="w-full border-t border-zinc-300" />
              </div>
              <div className="flex flex-col gap-4">
                {value.map((val, ind) => (
                  <ItemCard
                    key={ind}
                    name={val}
                    handleDelete={() => {
                      setValue(value.filter((_, idx) => ind != idx));
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QandAHandler = ({
  value,
  setValue,
}: {
  value: SourceDataType["QAndAs"];
  setValue: (val: SourceDataType["QAndAs"]) => void;
}) => {
  return (
    <div className="flex flex-col rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm p-6 gap-6">
      <div className="flex flex-col space-y-1.5 text-h3">{`Q&A`}</div>
      {value &&
        value.map((val, ind) => (
          <div key={ind} className="rounded border p-3 shadow">
            <div className="flex items-end justify-between">
              <label className="mb-2 text-sm text-zinc-700">Question</label>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent h-9 w-9 mb-1 px-2"
                onClick={()=>{
                  setValue(value.filter((_, idx) => ind != idx));
                }}
              >
                <FaTrash />
              </button>
            </div>
            <textarea
              className="w-full min-w-0 appearance-none rounded-md border border-zinc-900/10 bg-white p-1 px-3 text-zinc-900 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 sm:text-sm"
              rows={3}
              onChange={(e) => {
                setValue(
                  value.map((v, i) => {
                    if (i == ind) v.question = e.target.value;
                    return v;
                  })
                );
              }}
              value={val.question}
            />
            <label className="mt-8 text-sm text-zinc-700">Answer</label>
            <textarea
              className="mt-1 w-full min-w-0 appearance-none rounded-md border border-zinc-900/10 bg-white p-1 px-3 text-zinc-900 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 sm:text-sm"
              rows={8}
              onChange={(e) => {
                setValue(
                  value.map((v, i) => {
                    if (i == ind) v.answer = e.target.value;
                    return v;
                  })
                );
              }}
              value={val.answer}
            />
          </div>
        ))}

      <div className="flex justify-end">
        <button
          className="text-sm text-white bg-violet-500 rounded px-4 py-1"
          onClick={() => {
            setValue([...(value ?? []), { question: "", answer: "" }]);
          }}
        >
          Add New
        </button>
      </div>
    </div>
  );
};

const ItemCard = ({
  name,
  handleDelete,
}: {
  name: string;
  handleDelete?: () => void;
}) => {
  return (
    <div className="flex items-center w-full">
      <div className="border-input text-blue-500 bg-background flex h-9 w-full rounded-md border px-3 py-2 text-sm">
        {name}
      </div>
      {handleDelete && (
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent h-9 w-9 ml-2 px-2"
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};