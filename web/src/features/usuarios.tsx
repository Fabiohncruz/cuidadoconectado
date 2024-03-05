import React from 'react';
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  PasswordInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

import GroupIcon from '@mui/icons-material/Group';

const UsuarioList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="displayName"/>
        <TextField source="email"/>
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>
  );
};

const UsuarioEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="displayName" fullWidth/>
        <TextInput source="email" fullWidth/>
      </SimpleForm>
    </Edit>
  );
};

const UsuarioCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="displayName" fullWidth/>
        <TextInput source="email" fullWidth/>
        <PasswordInput source="password"/>
      </SimpleForm>
    </Create>
  );
};

export default {
  icon: GroupIcon,
  list: UsuarioList,
  create: UsuarioCreate,
  edit: UsuarioEdit,
};
