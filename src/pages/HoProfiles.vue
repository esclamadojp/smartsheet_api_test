<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-radio name="mygroup" v-model="mygroup" val=6 label="Country" />
      <q-radio name="mygroup" v-model="mygroup" val=7 label="State" />
      <q-radio name="mygroup" v-model="mygroup" val=8 label="City" />
      <q-radio name="mygroup" v-model="mygroup" val=10 label="Zip" />
    </q-form>

    <table >
      <tbody>
        <tr v-for="(records, groupings) in groupData" :key="groupings">
          <td style="vertical-align: top; text-align: left;">{{ groupings }}</td>
          <td>
            <table border="1" style="border-style: none;border-width: thin;">
              <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>eMail</th>
                  <th>Gender</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Street</th>
                  <th>Zip</th>
                  <th>ARR</th>
                </tr>
              <tr v-for="record in records" :key="record.Firstname">
                <td width="15%">{{ record.Firstname }} </td>
                <td width="15%">{{ record.Lastname }} </td>
                <td width="15%">{{ record.eMail }}</td>
                <td width="5%">{{ record.Gender }}</td>
                <td width="10%">{{ record.Country }}</td>
                <td width="10%">{{ record.State }}</td>
                <td width="10%">{{ record.City }}</td>
                <td width="10%">{{ record.Street }}</td>
                <td width="5%">{{ record.Zip }}</td>
                <td width="5%">{{ record.ARR }}</td>
              </tr>
              <tr>
                <td colspan="10" style="text-align: right;">Total ARR: {{ getTotalArr(records) }}</td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useQuasar } from 'quasar'
    import { api } from 'boot/axios' 

    const $q = useQuasar()
    const selected = ref([])
    const separator = ref('vertical')
    const tablerows = ref([])
    const loading = ref(false)
    const filter = ref('')
    const mygroup = ref(6)
    
    const columns = [
      {
        name: 'firstname',
        required: true,
        label: 'Firstname',
        align: 'left',
        field: 'firstname',
        format: val => `${val}`,
        sortable: true
      },
      { name: 'Lastname', align: 'left', label: 'Lastname', field: 'Lastname', sortable: true },
      { name: 'eMail', align: 'left', label: 'eMail', field: 'eMail', sortable: true },
      { name: 'Gender', align: 'center', label: 'Gender', field: 'Gender' },
      { name: 'Country', align: 'left', label: 'Country', field: 'Country', sortable: true  },
      { name: 'State', align: 'left', label: 'State', field: 'State', sortable: true  },
      { name: 'City', align: 'left', label: 'City', field: 'City', sortable: true  },
      { name: 'Street', align: 'left', label: 'Street', field: 'Street' },
      { name: 'Zip', align: 'left', label: 'Zip', field: 'Zip' },
      { name: 'ARR', align: 'right', label: 'ARR', field: 'ARR', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)}
    ]

    const loadData = () => {
        api.get('sheets/6040469330939780')
          .then((response) => {
            tablerows.value = response.data.rows
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

      const groupData = computed(() => {
          const grouped = {};

          // Group data by country
          tablerows.value.forEach(record => {
            console.log('value here!');
            console.log(mygroup.value);
          if (!grouped[record.cells[mygroup.value].displayValue]) {
           grouped[record.cells[mygroup.value].displayValue] = [];
          }

          grouped[record.cells[mygroup.value].displayValue].push({
              'Country': record.cells[6].displayValue,
              'Firstname': record.cells[2].displayValue,
              'Lastname': record.cells[3].displayValue,
              'eMail': record.cells[4].displayValue,
              'Gender': record.cells[5].displayValue,
              'Country': record.cells[6].displayValue,
              'State': record.cells[7].displayValue,
              'City': record.cells[8].displayValue,
              'Street': record.cells[9].displayValue,
              'Zip': record.cells[10].displayValue,
              'ARR': record.cells[1].displayValue
            });
          });

          console.log(grouped)
          return grouped;
      });

      const getTotalArr = (records) => {
        return records.reduce((total, record) => total + parseFloat(record.ARR), 0).toFixed(2);
      };

</script>
