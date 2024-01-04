<template>
  <div class="q-pa-md">
    <q-table
      :rows="tablerows"
      :columns="columns"
      row-key="id"
      v-model:selected="selected"
      dense
      :separator="separator"
      :filter="filter"
      :loading="loading"
      :pagination="{rowsPerPage:100}"
      >
  
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      
    </q-table>
  </div>

</template>

<script setup>
    import { ref } from 'vue'
    import { exportFile, useQuasar } from 'quasar'
    import { api } from 'boot/axios' 
    import axios from 'axios'

    const $q = useQuasar()
    const selected = ref([])
    const separator = ref('vertical')
    const tablerows = ref([])
    const loading = ref(false)
    const filter = ref('')
    
    const columns = [
      {
        name: 'firstname',
        required: true,
        label: 'Firstname',
        align: 'left',
        field: row => row.cells[2].displayValue,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'Lastname', align: 'left', label: 'Lastname', field: row => row.cells[3].displayValue, sortable: true },
      { name: 'eMail', align: 'left', label: 'eMail', field: row => row.cells[4].displayValue, sortable: true },
      { name: 'Gender', align: 'center', label: 'Gender', field: row => row.cells[5].displayValue },
      { name: 'Country', align: 'left', label: 'Country', field: row => row.cells[6].displayValue, sortable: true  },
      { name: 'State', align: 'left', label: 'State', field: row => row.cells[7].displayValue, sortable: true  },
      { name: 'City', align: 'left', label: 'City', field: row => row.cells[8].displayValue, sortable: true  },
      { name: 'Street', align: 'left', label: 'Street', field: row => row.cells[9].displayValue },
      { name: 'Zip', align: 'left', label: 'Zip', field: row => row.cells[10].displayValue },
      { name: 'ARR', align: 'right', label: 'ARR', field: row => row.cells[1].displayValue, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)}
    ]

    const loadData = () => {
        api.get('sheets/6040469330939780')
          .then((response) => {
            tablerows.value = response.data.rows
            console.log(response.data.rows);
          })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
        
      } 
      loadData();

</script>
