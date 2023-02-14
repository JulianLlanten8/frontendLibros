import { configure } from 'vee-validate';
configure({
    generateMessage: (ctx) => {
        const messages = {
            required: `El campo ${ctx.field} es obligatorio`,
            email: `El campo ${ctx.field} debe ser un email válido`,
            min: `El campo ${ctx.field} debe tener al menos ${ctx.length} caracteres`,
            max: `El campo ${ctx.field} debe tener como máximo ${ctx.length} caracteres`,
            confirmed: `El campo ${ctx.field} no coincide con ${ctx.target}`
        };
        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `El campo ${ctx.field} no es válido`;
        return message;
    }
});
