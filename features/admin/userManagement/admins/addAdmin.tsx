import { yupResolver } from "@hookform/resolvers/yup";
import { useAdminUsers } from "app/api/admin/users";
import Input from "app/components/form/Input";
import SubmitButton from "app/components/form/submitButton";
import { newAdminSchema } from "app/lib/schemas/admin";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddAdmin = ({onSuccess}: {onSuccess: () => void}) => {
    const { addAmin } = useAdminUsers()
    const methods = useForm({
      resolver: yupResolver(newAdminSchema),
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
      if (addAmin.isSuccess) {
        toast.success(addAmin?.data?.message);
          addAmin.reset();
          reset()
          onSuccess()
      }
    }, [addAmin.isSuccess]);
    
    const onAddNewAdmin = (data: any) => {
        console.log(data)
        addAmin.mutate(data)
    }
    return (
      <div>
        <div className="flex flex-col gap-5">
          <Input
            name="email"
            placeholder="Email"
            methods={methods}
            type="email"
            schema={newAdminSchema}
          />
          <Input
            name="firstName"
            placeholder="First Name"
            methods={methods}
            type="text"
            schema={newAdminSchema}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            methods={methods}
            type="text"
            schema={newAdminSchema}
          />
          <SubmitButton
            handleSubmit={handleSubmit(onAddNewAdmin)}
            isLoading={addAmin.isPending}
            name="Create"
          />
        </div>
      </div>
    );
};


export default AddAdmin;