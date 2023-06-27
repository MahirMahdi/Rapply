import { IResourceComponentsProps } from "@refinedev/core";
import { MuiEditInferencer } from "@refinedev/inferencer/mui";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <MuiEditInferencer
      fieldTransformer={(field) => {
        if (["$permissions", "$updatedAt", "$createdAt"].includes(field.key)) {
          return false;
        }
        return field;
      }}
    />
  );
};
