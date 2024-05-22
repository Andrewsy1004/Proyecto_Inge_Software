// Utilidad para enviar datos de informes al servidor
export const sendReportData = async (reportData) => {
    try {
        const response = await fetch('http://localhost:3000/actualizar-informe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        });

        const responseData = await response.json();
        return responseData; 
    } catch (error) {
        console.error('Error al enviar el reporte:', error);
        throw error; // Propagate the error for caller to handle
    }
};

// Función para preparar y enviar informes
export const getInformes = async (email, notes) => {
    const reportData = {
        email: email,
        saludo: 'Hola, aquí está tu informe diario:',
        notasPendientes: notes.filter(note => note.status === 'In Progress').length,
        notasSinIniciar: notes.filter(note => note.status === 'Without Starting').length,
        notasCompletadas: notes.filter(note => note.status === 'Finished').length
    };

    return await sendReportData(reportData);
}
