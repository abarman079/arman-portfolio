"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useActionState, useCallback, useEffect, useRef, useState } from "react";

import { submitContact } from "@/app/actions/contact";
import {
  contactFieldLimits,
  contactReasonLabels,
  contactReasonValues,
} from "@/schemas/contact";
import {
  initialContactActionState,
  type ContactDeliveryMode,
} from "@/lib/contact/types";

import styles from "./contact-form.module.css";
import { TurnstileWidget } from "./turnstile-widget";

interface ContactFormProps {
  deliveryMode: ContactDeliveryMode;
  turnstileSiteKey?: string;
}

interface FieldErrorProps {
  id: string;
  errors?: string[];
}

function FieldError({ id, errors }: FieldErrorProps) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p id={id} className={styles.errorText}>
      {errors[0]}
    </p>
  );
}

export function ContactForm({
  deliveryMode,
  turnstileSiteKey,
}: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactActionState,
  );
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const isProductionUnavailable = deliveryMode === "production-misconfigured";
  const hasTurnstile = deliveryMode === "configured" && Boolean(turnstileSiteKey);
  const resetSignal = state.resetTurnstile
    ? (state.requestId ?? state.status)
    : "idle";
  const handleTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }

    if (state.status === "validation-error") {
      const frame = requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [state.requestId, state.status]);

  const error = state.fieldErrors;
  const statusTone =
    state.status === "success"
      ? "success"
      : state.status === "idle"
        ? "idle"
        : "error";

  return (
    <form
      key={state.requestId ?? "initial"}
      ref={formRef}
      action={formAction}
      className={styles.form}
      aria-busy={pending}
    >
      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="contact-name">Name</label>
            <span aria-hidden="true">01</span>
          </div>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            minLength={contactFieldLimits.name.min}
            maxLength={contactFieldLimits.name.max}
            required
            defaultValue={state.values.name}
            aria-invalid={Boolean(error.name)}
            aria-describedby={error.name ? "contact-name-error" : undefined}
          />
          <FieldError id="contact-name-error" errors={error.name} />
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="contact-email">Email</label>
            <span aria-hidden="true">02</span>
          </div>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={contactFieldLimits.email.max}
            required
            defaultValue={state.values.email}
            aria-invalid={Boolean(error.email)}
            aria-describedby={error.email ? "contact-email-error" : undefined}
          />
          <FieldError id="contact-email-error" errors={error.email} />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-reason">Reason</label>
          <span aria-hidden="true">03</span>
        </div>
        <select
          id="contact-reason"
          name="reason"
          required
          defaultValue={state.values.reason}
          aria-invalid={Boolean(error.reason)}
          aria-describedby={error.reason ? "contact-reason-error" : undefined}
        >
          <option value="" disabled>
            Select a reason
          </option>
          {contactReasonValues.map((reason) => (
            <option value={reason} key={reason}>
              {contactReasonLabels[reason]}
            </option>
          ))}
        </select>
        <FieldError id="contact-reason-error" errors={error.reason} />
      </div>

      <div className={`${styles.field} ${styles.messageField}`}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-message">Message</label>
          <span aria-hidden="true">04</span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          minLength={contactFieldLimits.message.min}
          maxLength={contactFieldLimits.message.max}
          required
          defaultValue={state.values.message}
          aria-invalid={Boolean(error.message)}
          aria-describedby={
            error.message
              ? "contact-message-help contact-message-error"
              : "contact-message-help"
          }
        />
        <div className={styles.messageMeta}>
          <p id="contact-message-help">20–4,000 characters</p>
          <FieldError id="contact-message-error" errors={error.message} />
        </div>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input name="turnstileToken" type="hidden" value={turnstileToken} />

      {hasTurnstile && turnstileSiteKey ? (
        <>
          <TurnstileWidget
            siteKey={turnstileSiteKey}
            resetSignal={resetSignal}
            onTokenChange={handleTokenChange}
          />
          <FieldError
            id="contact-turnstile-error"
            errors={error.turnstileToken}
          />
        </>
      ) : (
        <p className={styles.configurationNote}>
          {deliveryMode === "development-disabled"
            ? "Local preview: form validation is active; email delivery and verification are not configured."
            : "Message delivery is temporarily unavailable. The direct email link remains active."}
        </p>
      )}

      <div className={styles.submitRow}>
        <motion.button
          type="submit"
          className={styles.submitButton}
          disabled={pending || isProductionUnavailable}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        >
          <span>
            {pending
              ? "Sending message"
              : state.status === "success"
                ? "Message sent"
                : "Send message"}
          </span>
          <span className={styles.submitMark} aria-hidden="true">
            {pending ? <span className={styles.pendingMark} /> : state.status === "success" ? "✓" : "→"}
          </span>
        </motion.button>

        <div
          className={styles.statusRegion}
          data-tone={statusTone}
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence initial={false} mode="wait">
            {pending ? (
              <motion.p
                key="pending"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              >
                Validating and delivering securely…
              </motion.p>
            ) : state.message ? (
              <motion.p
                key={state.requestId ?? state.status}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              >
                {state.message}
              </motion.p>
            ) : (
              <p key="idle">All four fields are required.</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
