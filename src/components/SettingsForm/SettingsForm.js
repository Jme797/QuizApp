import React from "react";

const options = [
  {
    label: "How many questions",
    key: "amount",
    options: [
      { label: "10", key: "10" },
      { label: "15", key: "15" },
      { label: "20", key: "20" },
      { label: "25", key: "25" },
      { label: "30", key: "30" },
    ],
  },
  {
    label: "Pick a category",
    key: "category",
    options: [
      { label: "Any", key: "any" },
      { label: "General Knowlege", key: "9" },
      { label: "Film", key: "11" },
      { label: "Music", key: "12" },
      { label: "Television", key: "14" },
      { label: "Video Games", key: "15" },
      { label: "Board Games", key: "16" },
    ],
  },
  {
    label: "Pick a difficulty",
    key: "difficulty",
    options: [
      { label: "Easy", key: "easy" },
      { label: "Medium", key: "medium" },
      { label: "Hard", key: "hard" },
    ],
  },
  {
    label: "Pick a style",
    key: "type",
    options: [
      { label: "Any", key: "any" },
      { label: "Multiple Choice", key: "multiple" },
      { label: "True / False", key: "boolean" },
    ],
  },
];

const SettingsForm = ({ setQuestions }) => {
  const handleSettingsForm = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(new FormData(e.target));
    for (const param of params.entries()) {
      if (param[1] == "any") params.delete(param[0]);
    }

    fetch("https://opentdb.com/api.php?" + params.toString())
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code == 0) {
          setQuestions(data.results);
        }
      });
  };
  return (
    <>
      <form onSubmit={handleSettingsForm}>
        <h2>Select your questions</h2>
        {options.map((option) => (
          <div className="formgroup" key={option.key}>
            <h1>{option.label}</h1>
            <fieldset>
              {option.options.map((item) => (
                <div key={item.key}>
                  <input
                    id={option.key + "_" + item.key}
                    type="radio"
                    name={option.key}
                    value={item.key}
                    required
                  />
                  <label htmlFor={option.key + "_" + item.key} key={item.key}>
                    {item.label}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        ))}
        <div>
          <button>Play</button>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
