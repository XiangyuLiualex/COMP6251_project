import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlots,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { FormEvent } from 'react';
import { SelfRegisterData_forSubmit, useSelfRegisterFormMutation } from '../../../../entities/patient/patient.query';
import { Role } from '../../../../entities/session/session.types';
import { forEach } from "json-server-auth";
import { sessionStore } from "../../../../entities/session";
import {useMedicalHistoryMutation } from '../../../../entities/patient/submitHistory.query.ts';

//const roles = ['Market', 'Finance', 'Development'];
/*const randomRole = () => {
    return randomArrayItem(roles);
};*/

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        //name: "",
        //age: null,
        //joinDate: null,
    },
];

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        //setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRows((oldRows) => [...oldRows, { id }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}


type selfRegisterConfig = {
    role: Role | null;
    data: any;
}
export type selfRegiForm = any[]

export default function FullFeaturedCrudGrid(config: selfRegisterConfig) {

    // TODO admin not allow to edit registration itself
    const ifNotSelfReg = config.role === 'patient' ? true : false;
    // TODO extend to a dynamic form
    function parseStringToForm(stringForm: selfRegiForm) {
        // todo dynamic change
        const res = stringForm;
        res.forEach(row => {
            row.age = Number(row.age)
            row.joinDate = new Date(row.joinDate)
            row.diagnosedDate = new Date(row.diagnosedDate)
        });
        return res;
    }
    console.log(config.data===null)
    console.log(config.data===undefined)
    var theRows = config.data === null ? initialRows : parseStringToForm(config.data);
     theRows = config.data === undefined ? initialRows : parseStringToForm(config.data);
     console.log('I am here',theRows)

    const selfRegMutate = useSelfRegisterFormMutation();
    const historyMutate = useMedicalHistoryMutation();

    //const mutate = ifNotSelfReg ? historyMutate.mutate : selfRegMutate.mutate;
    // 这里是确定使用哪个 mutate 函数的逻辑
    const mutate = config.role === 'patient' ? selfRegMutate.mutate : historyMutate.mutate;
    //role为patient传入selfReg，Role不为patient传入medicalhistory
    //const mutate = config.role === 'patient' ? historyMutate.mutate : selfRegMutate.mutate;



    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        /*const updatedRows = rows.map(row => ({
            ...row,
            patientId: sessionStore.getState().uid
        }));*/

        const updatedRows = rows.map((row => {
            const { id, ...rest } = row;
            return {
                id: randomId(),
                ...rest,
                patientId: sessionStore.getState().uid
            };
        }));

        mutate(updatedRows)
        console.log(updatedRows)//在这里加一个获取新的PatientId，怎么才能在formdata里面得到这个PatientId？现在这个patientId在formdata外面
    }

    const [rows, setRows] = React.useState(theRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        //const updatedRow = { ...newRow, isNew: false };
        const updatedRow = { ...newRow };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        /*{ field: 'name', headerName: 'Name', width: 180, editable: true },*/
        /*        {
                    field: 'patientid',
                    headerName: 'PatientId',
                    type: 'number',
                    width: 80,
                    align: 'left',
                    headerAlign: 'left',
                    editable: true,
                   /!*hide:true,
                    disableColumnMenu:true,
                    disableReorder: true,*!/
                    //hideable:true,
                },*/
        /* {
             field: 'age',
             headerName: 'Age',
             type: 'number',
             width: 80,
             align: 'left',
             headerAlign: 'left',
             editable: true,
         },
         {
             field: 'joinDate',
             headerName: 'Join date',
             type: 'date',
             width: 180,
             editable: true,
         },*/
        /*{
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },*/
        {
            field: 'disease',
            headerName: 'Disease',
            width: 240,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['None', 'Asthma', 'Diabetes', 'Epilepsy', 'Heart Attack', 'Raised Blood Pressure', 'Cancer', 'Heart Failure', 'Bipolar Disorder', 'Dementia', 'Others'],
        },
        {
            field: 'diseasedetails',
            headerName: 'Disease Details',
            width: 240,
            editable: true
        },
        {
            field: 'diagnosedDate',
            headerName: 'Diagnosed date',
            type: 'date',
            width: 200,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 140,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];



    return (
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}

        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
            <Button type="submit" variant="contained" color="primary" >
                Submit
            </Button>
        </Box>
    );
}

