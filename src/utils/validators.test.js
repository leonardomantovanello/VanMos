import { describe, test, expect } from 'vitest'
import { isValidCPF, isValidEmail, isValidPassword } from './validators'

describe('isValidCPF', () => {
    test('aceita um CPF válido formatado', () => {
        expect(isValidCPF('111.444.777-35')).toBe(true)
    })

    test('aceita um CPF válido só com dígitos', () => {
        expect(isValidCPF('11144477735')).toBe(true)
    })

    test('rejeita CPF com todos os dígitos iguais', () => {
        expect(isValidCPF('111.111.111-11')).toBe(false)
    })

    test('rejeita CPF com dígito verificador errado', () => {
        expect(isValidCPF('111.444.777-36')).toBe(false)
    })

    test('rejeita CPF com quantidade errada de dígitos', () => {
        expect(isValidCPF('123.456.789')).toBe(false)
    })

    test('rejeita valores vazios/nulos', () => {
        expect(isValidCPF('')).toBe(false)
        expect(isValidCPF(null)).toBe(false)
        expect(isValidCPF(undefined)).toBe(false)
    })
})

describe('isValidEmail', () => {
    test('aceita e-mails válidos', () => {
        expect(isValidEmail('usuario@exemplo.com')).toBe(true)
        expect(isValidEmail('nome.sobrenome@sub.dominio.com.br')).toBe(true)
    })

    test('rejeita e-mail sem @', () => {
        expect(isValidEmail('usuarioexemplo.com')).toBe(false)
    })

    test('rejeita e-mail sem domínio com ponto', () => {
        expect(isValidEmail('usuario@exemplo')).toBe(false)
    })

    test('rejeita e-mail com espaço', () => {
        expect(isValidEmail('usuario nome@exemplo.com')).toBe(false)
    })

    test('rejeita valores vazios/nulos', () => {
        expect(isValidEmail('')).toBe(false)
        expect(isValidEmail(null)).toBe(false)
    })
})

describe('isValidPassword', () => {
    test('aceita senha com maiúscula, minúscula, número e 8+ caracteres', () => {
        expect(isValidPassword('Abcdefg1')).toBe(true)
    })

    test('rejeita senha sem maiúscula', () => {
        expect(isValidPassword('abcdefg1')).toBe(false)
    })

    test('rejeita senha sem minúscula', () => {
        expect(isValidPassword('ABCDEFG1')).toBe(false)
    })

    test('rejeita senha sem número', () => {
        expect(isValidPassword('Abcdefgh')).toBe(false)
    })

    test('rejeita senha com menos de 8 caracteres', () => {
        expect(isValidPassword('Ab1defg')).toBe(false)
    })

    test('rejeita valores vazios/nulos', () => {
        expect(isValidPassword('')).toBe(false)
        expect(isValidPassword(null)).toBe(false)
    })
})
