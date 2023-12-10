import React from "react";
import { Create, List, Datagrid, TextField, Edit, EditButton, DeleteButton, NumberField, ReferenceField, SimpleForm, TextInput, ReferenceInput } from "react-admin";

const PulseiraList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="userId" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="userId" />
        <NumberField source="deviceId" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const PulseiraEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceInput source="userId" reference="users" />
        <TextInput source="deviceId" />
      </SimpleForm>
    </Edit>
  );
};

const PulseiraCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="userId" reference="users" />
        <TextInput source="deviceId" />
      </SimpleForm>
    </Create>
  );
};

export default {
  list: PulseiraList,
  create: PulseiraCreate,
  edit: PulseiraEdit,
};
