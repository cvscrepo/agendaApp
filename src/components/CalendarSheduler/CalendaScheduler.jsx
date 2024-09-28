import React, { useEffect } from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import { getAppointments, createAppointment } from '../../services/appointmentService';
import { getServices } from '../../services/servicesService';
import { useSnackbar } from '../../utils/AlertSnackBar';
import { ca } from 'date-fns/locale';
import { parse } from 'date-fns';
import { WEEK } from '../../utils/weekConfiguration.js'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { SchedulerContext } from './context.jsx';

export default function CalendaScheduler() {
    const [appointments, setAppointments] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const { showSnackbar } = useSnackbar();
    //Cargar las citas
    useEffect(() => {
        getAppointments().then((response) => {
            console.log("Appointments", response.value);
            const event = response.value;
            setAppointments(() => {
                return event.map((appointment) => {


                    const start = parse(appointment.startDate, "dd/MM/yyyy h:mm:ss a", new Date());
                    const end = parse(appointment.endDate, "dd/MM/yyyy h:mm:ss a", new Date());
                    console.log("Start", start);
                    return {
                        event_id: appointment.idAppointment,
                        title: appointment.nameAppointment,
                        start: start,
                        end: end,
                        firstNameClient: appointment.firstNameClient,
                        lastNameClient: appointment.lastName,
                        phone: appointment.phone,
                        service_id: appointment.idServicio
                    }
                });
            });
        });
        getServices().then((response) => {
            console.log("Services", response.value);
            const servicesNew = response.value.map((service) => {
                return {
                    id: service.idService,
                    text: service.nameService,
                    value: service.idService
                }
            });
            setServices(() => servicesNew);
        });
    }, []);
    const handleClick = (mesage) => {
        showSnackbar(mesage);
    }

    const handleConfirm = async (event, action) => {
        //  hacer una llamada a un servicio API para crear o editar el evento
        if (action === "edit") {
            console.log("Edit Event", event);
            // Llama a tu servicio de edición
            await editEventService(event);
        } else if (action === "create") {
            console.log("Create Event", event);
            //Se crea el evento
            const start = new Date(event.start);
            const CurrentDate = new Date();
            if (start < CurrentDate) {
                console.log("The date is less than the current date");
                handleClick("The date is less than the current date");
                return false;
            }
            try {
                const localStartDate = new Date(event.start).toISOString();
                const localEndDate = new Date(event.end).toISOString();

                const objToCreate = {
                    idAppointment: 0,
                    nameAppointment: event.title,
                    firstNameClient: event.firstNameClient,
                    lastName: event.lastNameClient,
                    idServicio: event.service_id,
                    startDate: localStartDate,
                    endDate: localEndDate,
                    phone: event.phone
                }
                console.log("Objeto a crear", objToCreate);
                const response = await createAppointment(objToCreate);
                handleClick("Appointment created successfully");
                return event;
            } catch (error) {
                handleClick("Error creating appointment");
                return false;
            }

        }

        // Actualiza el estado con el nuevo evento
        setAppointments((prevEvents) => {
            if (action === "edit") {
                return prevEvents.map((evt) =>
                    evt.event_id === event.event_id ? event : evt
                );
            }
            return [...prevEvents, event];
        });

        return event; // El evento actualizado o creado
    };


    const calendarRef = React.useContext(SchedulerContext);
    return (
        <>
            {services.length > 0 && (<Scheduler
                ref={calendarRef}
                view='week'
                week={WEEK}
                events={appointments}
                onConfirm={handleConfirm}
                
                fields={[
                    {
                        name: "firstNameClient",
                        type: "input",
                        config: { label: "First Name", required: true, errMsg: "This field is required" }
                    },
                    {
                        name: "lastNameClient",
                        type: "input",
                        config: { label: "Last Name", required: true, errMsg: "This field is required" }
                    },
                    {
                        name: "phone",
                        type: "input",
                        config: { label: "Phone", required: true, errMsg: "This field is required" }
                    },
                    {
                        name: 'service_id',
                        type: 'select',
                        options: services,
                        config: { label: "Service", required: true, errMsg: "This field is required" }
                    }
                ]}
            />)

            }

        </>
    )
}
