import React, { useState, useEffect } from "react";
import Switch from "./UI/Switch";
import Select from "./UI/Select";
import Group from "./UI/Group";
import Input from "./UI/Input";
import Radio from "./UI/Radio";
import Toggle from "./UI/Toggle";

const Form = ({ className, jsonForm, jsonFormHeading, setJsonForm }) => {
  const [outerToggle, setOuterToggle] = useState(false);
  const [innerToggle, setInnerToggle] = useState(false);
  const [requiredInner, setRequiredInner] = useState([]);
  const [requiredAll, setRequiredAll] = useState(false);

  // parsing form to JSON
  let formJson;
  try {
    formJson = JSON.parse(jsonForm);
  } catch (e) {
    formJson = {};
  }
  // console.log(formJson, formJson?.length);

  // checking if inner and outer toggle button are required or not
  useEffect(() => {
    let innerToggleArray = [];
    formJson?.length &&
      formJson?.map((item, i) => {
        item?.subParameters?.map((innerItem, j) => {
          if (!innerItem?.validate.required) {
            // console.log("inner printed", i, j);
            innerToggleArray.push(i);
          }
        });
        if (!item?.validate.required) {
          // console.log("printed", i);
          setOuterToggle(true);
        }
      });
    // console.log(innerToggleArray);
    if (innerToggleArray.length !== 0) {
      setInnerToggle(JSON.stringify(innerToggleArray));
    }
  }, [formJson]);

  // Handle inner toggles
  const multiToggleHandler = (i) => {
    if (requiredInner.includes(i)) {
      setRequiredInner(requiredInner.filter((d) => d !== i));
    } else {
      setRequiredInner((prev) => [...prev, i]);
    }
  };

  // Form cancel handler
  const cancelHandler = (e) => {
    e.preventDefault();
    setJsonForm("[]");
    setOuterToggle(false)
    setInnerToggle(false)
    setRequiredInner([])
    setRequiredAll(false)
  };

  // Form submit handler
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setJsonForm("[]");
    setOuterToggle(false)
    setInnerToggle(false)
    setRequiredInner([])
    setRequiredAll(false)
  };

  return (
    <div className={`bg-slate-900 text-white flex flex-col p-1 ${className}`}>
      <h1 className="bg-violet-900 p-2 rounded-md pl-3">Form</h1>
      <div className="flex-grow flex justify-center items-center ">
        {/* Form */}
        {formJson?.length !== 0 && (
          <form
            onSubmit={(e) => submitHandler(e)}
            className="bg-white text-black w-11/12 flex flex-col rounded-lg p-2 px-3 gap-3 overflow-y-scroll max-h-[80vh]"
          >
            {/* header */}
            <h1 className="font-semibold border-b pb-2 mb-2">
              {jsonFormHeading}
            </h1>

            {/* main */}
            {formJson?.length !== 0 &&
              // level 0 Visible
              formJson?.length &&
              formJson?.map((d, i) => {
                {
                  return d?.validate?.required === true ? (
                    <div key={`component ${i}`}>
                      {d.uiType === "Input" && (
                        <Group>
                          <Input
                            jsonKey={d.jsonKey}
                            label={d.label.split("_").join(" ")}
                            placeholder={d.placeholder}
                            description={d.description}
                            required={d.validate.required}
                            immutable={d.validate.immutable}
                          />
                        </Group>
                      )}
                      {d.uiType === "Select" && (
                        <Group>
                          <Select
                            jsonKey={d.jsonKey}
                            label={d.label.split("_").join(" ")}
                            placeholder={d.placeholder}
                            description={d.description}
                            required={d.validate.required}
                            immutable={d.validate.immutable}
                            defaultValue={d.validate.defaultValue}
                            options={d.validate.options}
                          />
                        </Group>
                      )}
                      {/* level 1 Shown*/}
                      {d.uiType === "Group" && (
                        <Group heading={d.label.split("_").join(" ")}>
                          {d?.subParameters.map((subd, j) => {
                            return subd?.validate?.required === true ? (
                              <div key={`subcomponent ${j}`}>
                                {subd.uiType === "Select" && (
                                  <Select
                                    jsonKey={subd.jsonKey}
                                    label={subd.label.split("_").join(" ")}
                                    placeholder={subd.placeholder}
                                    description={subd.description}
                                    required={subd.validate.required}
                                    immutable={subd.validate.immutable}
                                    defaultValue={subd.validate.defaultValue}
                                    options={subd.validate.options}
                                  />
                                )}
                                {subd.uiType === "Switch" && (
                                  <Switch
                                    jsonKey={subd.jsonKey}
                                    label={subd.label.split("_").join(" ")}
                                    placeholder={subd.placeholder}
                                    description={subd.description}
                                    required={subd.validate.required}
                                    immutable={subd.validate.immutable}
                                    defaultValue={subd.validate.defaultValue}
                                  />
                                )}
                                {subd.uiType === "Input" && (
                                  <Input
                                    jsonKey={subd.jsonKey}
                                    label={subd.label.split("_").join(" ")}
                                    placeholder={subd.placeholder}
                                    description={subd.description}
                                    required={subd.validate.required}
                                    immutable={subd.validate.immutable}
                                  />
                                )}
                                {subd.uiType === "Radio" && (
                                  <Radio
                                    jsonKey={subd.jsonKey}
                                    //  label={subd.label.split("_").join(" ")}
                                    //  placeholder={subd.placeholder}
                                    //  description={subd.description}
                                    defaultValue={subd.validate.defaultValue}
                                    immutable={subd.validate.immutable}
                                    options={subd.validate.options}
                                  />
                                )}

                                {/* level 3 */}
                                {subd?.subParameters !== undefined && (
                                  <>
                                    {subd?.subParameters.map((subsubd, k) => (
                                      <div key={`subsubcomponet ${k}`}>
                                        {subsubd?.uiType === "Select" && (
                                          <Select
                                            jsonKey={subsubd.jsonKey}
                                            label={subsubd.label
                                              .split("_")
                                              .join(" ")}
                                            placeholder={subsubd.placeholder}
                                            description={subsubd.description}
                                            required={subsubd.validate.required}
                                            immutable={
                                              subsubd.validate.immutable
                                            }
                                            defaultValue={
                                              subsubd.validate.defaultValue
                                            }
                                            options={subsubd.validate.options}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </>
                                )}
                              </div>
                            ) : (
                              // leverl 1 hidden
                              requiredInner.includes(i) && (
                                <div key={`subcomponent ${j}`}>
                                  {subd.uiType === "Select" && (
                                    <Select
                                      jsonKey={subd.jsonKey}
                                      label={subd.label.split("_").join(" ")}
                                      placeholder={subd.placeholder}
                                      description={subd.description}
                                      required={subd.validate.required}
                                      immutable={subd.validate.immutable}
                                      defaultValue={subd.validate.defaultValue}
                                      options={subd.validate.options}
                                    />
                                  )}
                                  {subd.uiType === "Switch" && (
                                    <Switch
                                      jsonKey={subd.jsonKey}
                                      label={subd.label.split("_").join(" ")}
                                      placeholder={subd.placeholder}
                                      description={subd.description}
                                      required={subd.validate.required}
                                      immutable={subd.validate.immutable}
                                      defaultValue={subd.validate.defaultValue}
                                    />
                                  )}
                                  {subd.uiType === "Input" && (
                                    <Input
                                      jsonKey={subd.jsonKey}
                                      label={subd.label.split("_").join(" ")}
                                      placeholder={subd.placeholder}
                                      description={subd.description}
                                      required={subd.validate.required}
                                      immutable={subd.validate.immutable}
                                    />
                                  )}
                                  {subd.uiType === "Radio" && (
                                    <Radio
                                      jsonKey={subd.jsonKey}
                                      //  label={subd.label.split("_").join(" ")}
                                      //  placeholder={subd.placeholder}
                                      //  description={subd.description}
                                      defaultValue={subd.validate.defaultValue}
                                      immutable={subd.validate.immutable}
                                      options={subd.validate.options}
                                    />
                                  )}

                                  {/* level 3 */}
                                  {subd?.subParameters !== undefined && (
                                    <>
                                      {subd?.subParameters.map((subsubd, k) => (
                                        <div key={`subsubcomponet ${k}`}>
                                          {subsubd?.uiType === "Select" && (
                                            <Select
                                              jsonKey={subsubd.jsonKey}
                                              label={subsubd.label
                                                .split("_")
                                                .join(" ")}
                                              placeholder={subsubd.placeholder}
                                              description={subsubd.description}
                                              required={
                                                subsubd.validate.required
                                              }
                                              immutable={
                                                subsubd.validate.immutable
                                              }
                                              defaultValue={
                                                subsubd.validate.defaultValue
                                              }
                                              options={subsubd.validate.options}
                                            />
                                          )}
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </div>
                              )
                            );
                          })}
                          {innerToggle &&
                            JSON.parse(innerToggle).includes(i) && (
                              <Toggle
                                toggle={requiredInner?.includes(i)}
                                onClick={() => {
                                  multiToggleHandler(i);
                                }}
                              />
                            )}
                        </Group>
                      )}
                    </div>
                  ) : (
                    // level 0 Hidden
                    requiredAll && (
                      <div key={`component ${i}`}>
                        {d.uiType === "Input" && (
                          <Group>
                            <Input
                              jsonKey={d.jsonKey}
                              label={d.label.split("_").join(" ")}
                              placeholder={d.placeholder}
                              description={d.description}
                              required={d.validate.required}
                              immutable={d.validate.immutable}
                            />
                          </Group>
                        )}
                        {d.uiType === "Select" && (
                          <Group>
                            <Select
                              jsonKey={d.jsonKey}
                              label={d.label.split("_").join(" ")}
                              placeholder={d.placeholder}
                              description={d.description}
                              required={d.validate.required}
                              immutable={d.validate.immutable}
                              defaultValue={d.validate.defaultValue}
                              options={d.validate.options}
                            />
                          </Group>
                        )}
                        {d.uiType === "Group" && (
                          <Group heading={d.label.split("_").join(" ")}>
                            {d?.subParameters.map((subd, j) => {
                              return subd?.validate?.required === true ? (
                                <div key={`subcomponent ${j}`}>
                                  {subd.uiType === "Select" && (
                                    <Select
                                      jsonKey={subd.jsonKey}
                                      label={subd.label.split("_").join(" ")}
                                      placeholder={subd.placeholder}
                                      description={subd.description}
                                      required={subd.validate.required}
                                      immutable={subd.validate.immutable}
                                      defaultValue={subd.validate.defaultValue}
                                      options={subd.validate.options}
                                    />
                                  )}
                                  {subd.uiType === "Switch" && (
                                    <Switch
                                      jsonKey={subd.jsonKey}
                                      label={subd.label.split("_").join(" ")}
                                      placeholder={subd.placeholder}
                                      description={subd.description}
                                      required={subd.validate.required}
                                      immutable={subd.validate.immutable}
                                      defaultValue={subd.validate.defaultValue}
                                    />
                                  )}
                                  {subd.uiType === "Input" && (
                                    <Input
                                      jsonKey={subd.jsonKey}
                                      label={subd.label.split("_").join(" ")}
                                      placeholder={subd.placeholder}
                                      description={subd.description}
                                      required={subd.validate.required}
                                      immutable={subd.validate.immutable}
                                    />
                                  )}
                                  {subd.uiType === "Radio" && (
                                    <Radio
                                      jsonKey={subd.jsonKey}
                                      defaultValue={subd.validate.defaultValue}
                                      immutable={subd.validate.immutable}
                                      options={subd.validate.options}
                                    />
                                  )}

                                  {/* level 3 */}
                                  {subd?.subParameters !== undefined && (
                                    <>
                                      {subd?.subParameters.map((subsubd, k) => (
                                        <div key={`subsubcomponet ${k}`}>
                                          {subsubd?.uiType === "Select" && (
                                            <Select
                                              jsonKey={subsubd.jsonKey}
                                              label={subsubd.label
                                                .split("_")
                                                .join(" ")}
                                              placeholder={subsubd.placeholder}
                                              description={subsubd.description}
                                              required={
                                                subsubd.validate.required
                                              }
                                              immutable={
                                                subsubd.validate.immutable
                                              }
                                              defaultValue={
                                                subsubd.validate.defaultValue
                                              }
                                              options={subsubd.validate.options}
                                            />
                                          )}
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </div>
                              ) : (
                                // leverl 1 hidden
                                requiredInner.includes(i) && (
                                  <div key={`subcomponent ${j}`}>
                                    {subd.uiType === "Select" && (
                                      <Select
                                        jsonKey={subd.jsonKey}
                                        label={subd.label.split("_").join(" ")}
                                        placeholder={subd.placeholder}
                                        description={subd.description}
                                        required={subd.validate.required}
                                        immutable={subd.validate.immutable}
                                        defaultValue={
                                          subd.validate.defaultValue
                                        }
                                        options={subd.validate.options}
                                      />
                                    )}
                                    {subd.uiType === "Switch" && (
                                      <Switch
                                        jsonKey={subd.jsonKey}
                                        label={subd.label.split("_").join(" ")}
                                        placeholder={subd.placeholder}
                                        description={subd.description}
                                        required={subd.validate.required}
                                        immutable={subd.validate.immutable}
                                        defaultValue={
                                          subd.validate.defaultValue
                                        }
                                      />
                                    )}
                                    {subd.uiType === "Input" && (
                                      <Input
                                        jsonKey={subd.jsonKey}
                                        label={subd.label.split("_").join(" ")}
                                        placeholder={subd.placeholder}
                                        description={subd.description}
                                        required={subd.validate.required}
                                        immutable={subd.validate.immutable}
                                      />
                                    )}
                                    {subd.uiType === "Radio" && (
                                      <Radio
                                        jsonKey={subd.jsonKey}
                                        //  label={subd.label.split("_").join(" ")}
                                        //  placeholder={subd.placeholder}
                                        //  description={subd.description}
                                        defaultValue={
                                          subd.validate.defaultValue
                                        }
                                        immutable={subd.validate.immutable}
                                        options={subd.validate.options}
                                      />
                                    )}

                                    {/* level 3 */}
                                    {subd?.subParameters !== undefined && (
                                      <>
                                        {subd?.subParameters.map(
                                          (subsubd, k) => (
                                            <div key={`subsubcomponet ${k}`}>
                                              {subsubd?.uiType === "Select" && (
                                                <Select
                                                  jsonKey={subsubd.jsonKey}
                                                  label={subsubd.label
                                                    .split("_")
                                                    .join(" ")}
                                                  placeholder={
                                                    subsubd.placeholder
                                                  }
                                                  description={
                                                    subsubd.description
                                                  }
                                                  required={
                                                    subsubd.validate.required
                                                  }
                                                  immutable={
                                                    subsubd.validate.immutable
                                                  }
                                                  defaultValue={
                                                    subsubd.validate
                                                      .defaultValue
                                                  }
                                                  options={
                                                    subsubd.validate.options
                                                  }
                                                />
                                              )}
                                            </div>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                )
                              );
                            })}
                            {innerToggle &&
                              JSON.parse(innerToggle).includes(i) && (
                                <Toggle
                                  toggle={requiredInner?.includes(i)}
                                  onClick={() => {
                                    multiToggleHandler(i);
                                  }}
                                />
                              )}
                          </Group>
                        )}
                      </div>
                    )
                  );
                }
              })}

            {/* footer */}
            <div className="flex justify-between text-sm font-semibold items-center pb-5 border-t pt-3 border-blue-100">
              {outerToggle && (
                <Toggle
                  toggle={requiredAll}
                  onClick={() => setRequiredAll((prev) => !prev)}
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={(e) => cancelHandler(e)}
                  className="px-2 py-1 rounded-md border border-slate-400"
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 rounded-md border border-slate-400 bg-gray-700 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;
