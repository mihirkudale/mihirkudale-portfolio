/**
 * Unit tests for chatbot logic functions.
 * Tests getChatbotReply() and normalizeInput() for various scenarios.
 */
import { describe, it, expect } from "vitest";
import { getChatbotReply, normalizeInput } from "./chatbotLogic";

describe("normalizeInput", () => {
    it("should lowercase input", () => {
        expect(normalizeInput("HELLO")).toBe("hello");
        expect(normalizeInput("HeLLo WoRLD")).toBe("hello world");
    });

    it("should trim whitespace", () => {
        expect(normalizeInput("  hello  ")).toBe("hello");
        expect(normalizeInput("\t\nhello\n\t")).toBe("hello");
    });

    it("should collapse multiple spaces", () => {
        expect(normalizeInput("hello    world")).toBe("hello world");
    });

    it("should remove special characters", () => {
        expect(normalizeInput("hello!")).toBe("hello");
        expect(normalizeInput("what's up?")).toBe("what s up");
        expect(normalizeInput("hello@#$%world")).toBe("hello world");
    });

    it("should return empty string for non-string input", () => {
        expect(normalizeInput(null)).toBe("");
        expect(normalizeInput(undefined)).toBe("");
        expect(normalizeInput(123)).toBe("");
        expect(normalizeInput({})).toBe("");
    });

    it("should handle empty string", () => {
        expect(normalizeInput("")).toBe("");
        expect(normalizeInput("   ")).toBe("");
    });
});

describe("getChatbotReply", () => {
    describe("greeting intent", () => {
        it("should respond to 'hi'", () => {
            const reply = getChatbotReply("hi");
            expect(reply).toContain("Hi!");
            expect(reply).toContain("Mihir");
        });

        it("should respond to 'hello'", () => {
            const reply = getChatbotReply("hello");
            expect(reply).toContain("Hi!");
        });

        it("should respond to 'hey'", () => {
            const reply = getChatbotReply("hey");
            expect(reply).toContain("Hi!");
        });

        it("should respond to 'good morning'", () => {
            const reply = getChatbotReply("good morning");
            expect(reply).toContain("Hi!");
        });
    });

    describe("skills intent", () => {
        it("should respond to 'skills'", () => {
            const reply = getChatbotReply("skills");
            expect(reply.toLowerCase()).toContain("skill");
        });

        it("should respond to 'tech stack'", () => {
            const reply = getChatbotReply("tech stack");
            expect(reply.toLowerCase()).toContain("skill");
        });

        it("should respond to 'technologies'", () => {
            const reply = getChatbotReply("technologies");
            expect(reply.toLowerCase()).toContain("skill");
        });
    });

    describe("projects intent", () => {
        it("should respond to 'projects'", () => {
            const reply = getChatbotReply("projects");
            expect(reply.toLowerCase()).toContain("project");
        });

        it("should respond to 'portfolio'", () => {
            const reply = getChatbotReply("portfolio");
            expect(reply.toLowerCase()).toContain("project");
        });
    });

    describe("education intent", () => {
        it("should respond to 'education'", () => {
            const reply = getChatbotReply("education");
            expect(reply.toLowerCase()).toContain("education");
        });

        it("should respond to 'degree'", () => {
            const reply = getChatbotReply("degree");
            expect(reply.toLowerCase()).toContain("education");
        });

        it("should respond to 'MCA'", () => {
            const reply = getChatbotReply("MCA");
            expect(reply.toLowerCase()).toContain("education");
        });
    });

    describe("work experience intent", () => {
        it("should respond to 'work experience'", () => {
            const reply = getChatbotReply("work experience");
            expect(reply.toLowerCase()).toContain("experience");
        });

        it("should respond to 'jobs'", () => {
            const reply = getChatbotReply("jobs");
            expect(reply.toLowerCase()).toContain("experience");
        });

        it("should respond to 'career'", () => {
            const reply = getChatbotReply("career");
            expect(reply.toLowerCase()).toContain("experience");
        });
    });

    describe("contact intent", () => {
        it("should respond to 'contact'", () => {
            const reply = getChatbotReply("contact");
            expect(reply.toLowerCase()).toContain("email");
        });

        it("should respond to 'email'", () => {
            const reply = getChatbotReply("email");
            expect(reply.toLowerCase()).toContain("email");
        });

        it("should respond to 'linkedin'", () => {
            const reply = getChatbotReply("linkedin");
            expect(reply.toLowerCase()).toContain("linkedin");
        });
    });

    describe("certifications intent", () => {
        it("should respond to 'certifications'", () => {
            const reply = getChatbotReply("certifications");
            expect(reply.toLowerCase()).toContain("certification");
        });

        it("should respond to 'microsoft certified'", () => {
            const reply = getChatbotReply("microsoft certified");
            expect(reply.toLowerCase()).toContain("certification");
        });
    });

    describe("resume/cv intent", () => {
        it("should respond to 'resume'", () => {
            const reply = getChatbotReply("resume");
            expect(reply.toLowerCase()).toContain("resume");
        });

        it("should respond to 'cv'", () => {
            const reply = getChatbotReply("cv");
            expect(reply.toLowerCase()).toContain("resume");
        });
    });

    describe("farewell intent", () => {
        it("should respond to 'thanks'", () => {
            const reply = getChatbotReply("thanks");
            expect(reply).toContain("welcome");
        });

        it("should respond to 'bye'", () => {
            const reply = getChatbotReply("bye");
            expect(reply).toContain("welcome");
        });
    });

    describe("fallback behavior", () => {
        it("should return fallback for unrecognized input", () => {
            const reply = getChatbotReply("asdfghjkl");
            expect(reply).toContain("didn't quite get that");
        });

        it("should return empty input message for empty string", () => {
            const reply = getChatbotReply("");
            expect(reply).toContain("Ask about");
        });

        it("should return empty input message for whitespace only", () => {
            const reply = getChatbotReply("   ");
            expect(reply).toContain("Ask about");
        });
    });

    describe("edge cases", () => {
        it("should handle very long input", () => {
            const longInput = "a".repeat(1000);
            const reply = getChatbotReply(longInput);
            expect(typeof reply).toBe("string");
            expect(reply.length).toBeGreaterThan(0);
        });

        it("should handle special characters only", () => {
            const reply = getChatbotReply("!@#$%^&*()");
            expect(reply).toContain("Ask about");
        });

        it("should handle mixed case queries", () => {
            const reply = getChatbotReply("WHAT ARE YOUR SKILLS?");
            expect(reply.toLowerCase()).toContain("skill");
        });

        it("should not match 'hi' within 'mihir'", () => {
            // The user name "Mihir" contains "hi" but should not trigger greeting
            const reply = getChatbotReply("mihir");
            // Should match "about mihir" or "who is mihir" intent, not greeting
            expect(reply).not.toBe("Hi!");
        });
    });
});
