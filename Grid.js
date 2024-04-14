
module.exports = class Grid {

    status = 'consuming'

    constructor(){
        this.build()
    }
    async build(){
        // kWh
        var response = await fetch('http://192.168.10.62/api/v2/sm/actual')
        response = await response.json()
        global.ha.updateSensor(`house_current_tariff`, `${response['electricity_tariff'].value}`, `House - Current Tariff`, ' ', `house_current_tariff`)
        await this.addkWhSensor("House - Tariff 1 Delivered", `house_energy_delivered_1`, `house_energy_delivered_1`, `${response['energy_delivered_tariff1'].value}`)
        await this.addkWhSensor("House - Tariff 2 Delivered", `house_energy_delivered_2`, `house_energy_delivered_2`, `${response['energy_delivered_tariff2'].value}`)
        await this.addkWhSensor("House - Tariff 1 Returned", `house_energy_returned_1`, `house_energy_returned_1`, `${response['energy_returned_tariff1'].value}`)
        await this.addkWhSensor("House - Tariff 2 Returned", `house_energy_returned_2`, `house_energy_returned_2`, `${response['energy_returned_tariff2'].value}`)

        // gas
        await this.addGasSensor("House - Gas Taken", `house_gas_taken`, `house_gas_taken`, `${response['gas_delivered'].value}`)

        // Wh
        await this.addWhSensor("House - Tariff 1 Delivered", `house_energy_delivered_1_wh`, `house_energy_delivered_1`, `${response['energy_delivered_tariff1'].value}` * 1000)
        await this.addWhSensor("House - Tariff 2 Delivered", `house_energy_delivered_2_wh`, `house_energy_delivered_2`, `${response['energy_delivered_tariff2'].value}` * 1000)
        await this.addWhSensor("House - Tariff 1 Returned", `house_energy_returned_1_wh`, `house_energy_returned_1`, `${response['energy_returned_tariff1'].value}` * 1000)
        await this.addWhSensor("House - Tariff 2 Returned", `house_energy_returned_2_wh`, `house_energy_returned_2`, `${response['energy_returned_tariff2'].value}` * 1000)

        if(response['power_delivered'].value > 0){
            this.status = 'Consuming'
            await this.addkWhSensor("House - Power Taken", `house_energy_taken`, `house_energy_taken`, `${response['power_delivered'].value}`)
            await this.addWhSensor("House - Power Taken", `house_energy_taken_wh`, `house_energy_taken`, `${response['power_delivered'].value}` * 1000)
            await this.addkWhSensor("House - Power Taken l1", `house_energy_taken_l1`, `house_energy_taken_l1`, `${response['power_delivered_l1'].value}`)
            await this.addWhSensor("House - Power Taken l1", `house_energy_taken_l1_wh`, `house_energy_taken_l1`, `${response['power_delivered_l1'].value}` * 1000)
            global.ha.updateSensor(`house_grid_status`, this.status, `House - Grid status`, ' ', `house_grid_status`)
        }
        if(response['power_returned'].value > 0){  
            this.status = 'Producing'
            global.ha.updateSensor(`house_grid_status`, this.status, `House - Grid status`, ' ', `house_grid_status`)
            await this.addkWhSensor("House - Power Returned", `house_energy_returned`, `house_energy_returned`, `${response['power_returned'].value}`)
            await this.addWhSensor("House - Power Returned", `house_energy_returned_wh`, `house_energy_returned`, `${response['power_returned'].value}` * 1000)
            await this.addkWhSensor("House - Power Returned l1", `house_energy_returned_l1`, `house_energy_returned_l1`, `${response['power_returned_l1'].value}`)
            await this.addWhSensor("House - Power Returned l1", `house_energy_returned_l1_wh`, `house_energy_returned_l1`, `${response['power_returned_l1'].value}` * 1000)
        }
        this.run()
    }
    async run(){
        // kWh
        while( 1 > 0 ){
            await new Promise((resolve) => {setTimeout(resolve, 5000);});
            var response = await fetch('http://192.168.10.62/api/v2/sm/actual')
            response = await response.json()
            try {
                await this.addkWhSensor("House - Tariff 1 Delivered", `house_energy_delivered_1`, `house_energy_delivered_1`, `${response['energy_delivered_tariff1'].value}`)
                await this.addkWhSensor("House - Tariff 2 Delivered", `house_energy_delivered_2`, `house_energy_delivered_2`, `${response['energy_delivered_tariff2'].value}`)
                await this.addkWhSensor("House - Tariff 1 Returned", `house_energy_returned_1`, `house_energy_returned_1`, `${response['energy_returned_tariff1'].value}`)
                await this.addkWhSensor("House - Tariff 2 Returned", `house_energy_returned_2`, `house_energy_returned_2`, `${response['energy_returned_tariff2'].value}`)
                await this.addkWhSensor("House - Tariff", `house_tariff`, `house_current_tariff`, `${response['electricity_tariff'].value}`)
        
                // gas
                await this.addGasSensor("House - Gas Taken", `house_gas_taken`, `house_gas_taken`, `${response['gas_delivered'].value}`)
        
                // Wh
                await this.addWhSensor("House - Tariff 1 Delivered", `house_energy_delivered_1_wh`, `house_energy_delivered_1`, `${response['energy_delivered_tariff1'].value}` * 1000)
                await this.addWhSensor("House - Tariff 2 Delivered", `house_energy_delivered_2_wh`, `house_energy_delivered_2`, `${response['energy_delivered_tariff2'].value}` * 1000)
                await this.addWhSensor("House - Tariff 1 Returned", `house_energy_returned_1_wh`, `house_energy_returned_1`, `${response['energy_returned_tariff1'].value}` * 1000)
                await this.addWhSensor("House - Tariff 2 Returned", `house_energy_returned_2_wh`, `house_energy_returned_2`, `${response['energy_returned_tariff2'].value}` * 1000)
                await this.addWhSensor("House - Tariff", `house_tariff_wh`, `house_tariff`, `${response['electricity_tariff'].value}` * 1000)

                if(response['power_delivered'].value > 0){
                    this.status = 'Consuming'
                    await this.addkWhSensor("House - Power Taken", `house_energy_taken`, `house_energy_taken`, `${response['power_delivered'].value}`)
                    await this.addWhSensor("House - Power Taken", `house_energy_taken_wh`, `house_energy_taken`, `${response['power_delivered'].value}` * 1000)
                    await this.addkWhSensor("House - Power Taken l1", `house_energy_taken_l1`, `house_energy_taken_l1`, `${response['power_delivered_l1'].value}`)
                    await this.addWhSensor("House - Power Taken l1", `house_energy_taken_l1_wh`, `house_energy_taken_l1`, `${response['power_delivered_l1'].value}` * 1000)
                    global.ha.updateSensor(`house_grid_status`, this.status, `House - Grid status`, ' ', `house_grid_status`)
                }
                if(response['power_returned'].value > 0){  
                    this.status = 'Producing'
                    global.ha.updateSensor(`house_grid_status`, this.status, `House - Grid status`, ' ', `house_grid_status`)
                    await this.addkWhSensor("House - Power Returned", `house_energy_returned`, `house_energy_returned`, `${response['power_returned'].value}`)
                    await this.addWhSensor("House - Power Returned", `house_energy_returned_wh`, `house_energy_returned`, `${response['power_returned'].value}` * 1000)
                    await this.addkWhSensor("House - Power Returned l1", `house_energy_returned_l1`, `house_energy_returned_l1`, `${response['power_returned_l1'].value}`)
                    await this.addWhSensor("House - Power Returned l1", `house_energy_returned_l1_wh`, `house_energy_returned_l1`, `${response['power_returned_l1'].value}` * 1000)
                }

                //FLOOR 0
                var corridor_current_energy = await global.ha.state('sensor.corridor_current_energy')
                await this.addWhSensor("Corridor - Current energy", `house_corridor_room_current_energy`, `house_corridor_room_current_energy`, corridor_current_energy.state)
                
                var facade_current_energy = await global.ha.state('sensor.facade_current_energy')
                await this.addWhSensor("Facade - Current energy", `house_facade_room_current_energy`, `house_facade_room_current_energy`, facade_current_energy.state)
                
                var garden_current_energy = await global.ha.state('sensor.garden_current_energy')
                await this.addWhSensor("Garden - Current energy", `house_garden_room_current_energy`, `house_garden_room_current_energy`, garden_current_energy.state)

                var greenhouse_current_energy = await global.ha.state('sensor.greenhouse_current_energy')
                await this.addWhSensor("Greenhouse - Current energy", `house_greenhouse_current_energy`, `house_greenhouse_current_energy`, greenhouse_current_energy.state)

                var kitchen_current_energy = await global.ha.state('sensor.kitchen_current_energy')
                await this.addWhSensor("Kitchen - Current energy", `house_kitchen_current_energy`, `house_kitchen_current_energy`, kitchen_current_energy.state)

                var living_room_current_energy = await global.ha.state('sensor.living_room_current_energy')
                await this.addWhSensor("Living room - Current energy", `house_living_room_current_energy`, `house_living_room_current_energy`, living_room_current_energy.state)
                
                var shed_current_energy = await global.ha.state('sensor.shed_current_energy')
                await this.addWhSensor("Shed - Current energy", `house_shed_current_energy`, `house_shed_current_energy`, shed_current_energy.state)
                
                var toilet_current_energy = await global.ha.state('sensor.toilet_current_energy')
                await this.addWhSensor("Toilet - Current energy", `house_toilet_current_energy`, `house_toilet_current_energy`, toilet_current_energy.state)

                //STORAGE
                var storage_current_energy = await global.ha.state('sensor.storage_current_energy')
                await this.addWhSensor("Storage - Current energy", `house_storage_current_energy`, `house_storage_current_energy`, storage_current_energy.state)

                //FLOOR 1
                var bathroom_current_energy = await global.ha.state('sensor.bathroom_current_energy')
                await this.addWhSensor("Bathroom - Current energy", `house_bathroom_current_energy`, `house_bathroom_current_energy`, bathroom_current_energy.state)

                var bedroom_current_energy = await global.ha.state('sensor.bedroom_current_energy')
                await this.addWhSensor("Bedroom - Current energy", `house_bedroom_current_energy`, `house_bedroom_current_energy`, bedroom_current_energy.state)

                var guestroom_current_energy = await global.ha.state('sensor.guestroom_current_energy')
                await this.addWhSensor("Guestroom - Current energy", `house_guestroom_current_energy`, `house_guestroom_current_energy`, guestroom_current_energy.state)

                var office_current_energy = await global.ha.state('sensor.office_current_energy')
                await this.addWhSensor("Office - Current energy", `house_office_current_energy`, `house_office_current_energy`, office_current_energy.state)

                var server_room_current_energy = await global.ha.state('sensor.server_room_current_energy')
                await this.addWhSensor("Server room - Current energy", `house_server_room_current_energy`, `house_server_room_current_energy`, server_room_current_energy.state)

                //FLOOR 2
                var attic_current_energy = await global.ha.state('sensor.attic_current_energy')
                await this.addWhSensor("Attic - Current energy", `house_attic_current_energy`, `house_attic_current_energy`, attic_current_energy.state)

            } catch (err) {
                console.log(err)
            }
        }

    }
    async addGasSensor(friendly_name, unique_id, parent_unique_id, state){
        try {
        var sensor = { friendly_name: friendly_name, parent_unique_id: parent_unique_id, unique_id: unique_id, state: state }
        global.ha.hass.states.update('sensor', unique_id, {
            state: state,
            attributes: {
              friendly_name: friendly_name,
              unit_of_measurement: `m³`,
              unique_id: unique_id,
              device_class: 'gas',
              state_class: 'total_increasing',
            }
          });
        } catch (err) {
            console.log(err)
        }
    }
    async addWhSensor(friendly_name, unique_id, parent_unique_id, state){
        try {
        var sensor = { friendly_name: friendly_name, parent_unique_id: parent_unique_id, unique_id: unique_id, state: state }
        global.ha.hass.states.update('sensor', unique_id, {
            state: state,
            attributes: {
              friendly_name: friendly_name,
              unit_of_measurement: `Wh`,
              unique_id: unique_id,
              state_class: 'total_increasing',
              device_class: 'energy'
            }
          });
        } catch (err) {
            console.log(err)
        }
    }
    async addkWhSensor(friendly_name, unique_id, parent_unique_id, state){
        try {
        var sensor = { friendly_name: friendly_name, parent_unique_id: parent_unique_id, unique_id: unique_id, state: state }
        global.ha.hass.states.update('sensor', unique_id, {
            state: state,
            attributes: {
              friendly_name: friendly_name,
              unit_of_measurement: `kWh`,
              unique_id: unique_id,
              state_class: 'total_increasing',
              device_class: 'energy'
            }
          });
            } catch (err) {
                console.log(err)
            }
    }
    async getActual(){

    }
  }