import { Form, Input, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

import "./form-item.scss";

interface FormValues {
  task?: string;
}

interface CreateFromProps {
  addTask: (taskName: string) => void;
}

const taskFieldRules = [
  {
    pattern: /^(?!\s*$).+/,
    message: "This field cannot consist of spaces only",
  },
  { required: true, message: "This field cannot be empty" },
];

const CreateForm: React.FC<CreateFromProps> = ({ addTask }) => {
  const [form] = useForm();

  const handleFinish = (values: FormValues) => {
    if (values.task) {
      addTask(values.task);
      form.setFieldsValue({ task: "" });
    }
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <Form
      variant="borderless"
      name="basic"
      onFinish={handleFinish}
      onFinishFailed={event => setError(event.errorFields[0].errors[0])}
      onChange={() => setError(null)}
      autoComplete="off"
      form={form}
    >
      <Tooltip
        title={error}
        open={!!error}
        placement="topLeft"
        trigger={[]}
      ></Tooltip>

      <Form.Item
        rules={taskFieldRules}
        className="form-item"
        name="task"
        help={false}
      >
        <Input allowClear size="large" placeholder="What needs to be done?" />
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
