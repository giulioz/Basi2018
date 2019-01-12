import React from "react";
import MUIDataTable from "mui-datatables";
import { Tooltip, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default ({ data, columns }) => {
  const AddButton = () => {
    return (
      <React.Fragment>
        {/* <EmailAddDialog
          open={addDialogOpen}
          onAbort={onCloseDialog}
          onAdd={onAddEmail}
          listName={label}
        /> */}
        <Tooltip title={"Aggiungi"}>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  return (
    <MUIDataTable
      options={{
        customToolbar: AddButton,
        textLabels: {
          body: {
            noMatch: "Nessun record trovato",
            toolTip: "Ordina"
          },
          pagination: {
            next: "Pagina Successiva",
            previous: "Pagina Precedente",
            rowsPerPage: "Record per pagina:",
            displayRows: "di"
          },
          toolbar: {
            search: "Cerca",
            downloadCsv: "Scarica CSV",
            print: "Stampa",
            viewColumns: "Visualizza Colonne",
            filterTable: "Filtra Tabella"
          },
          filter: {
            all: "Tutti",
            title: "FILTRI",
            reset: "REIMPOSTA"
          },
          viewColumns: {
            title: "Mostra Colonne",
            titleAria: "Mostra/Nascondi Colonne"
          },
          selectedRows: {
            text: "righe selezionate",
            delete: "Cancella",
            deleteAria: "Cancella Righe Selezionate"
          }
        }
      }}
      data={data}
      columns={columns}
    />
  );
};
