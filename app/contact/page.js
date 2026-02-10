export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <p className="mb-4">
        We value user feedback and are always happy to hear from you. If you
        have questions, suggestions, or notice any issues with our calculators,
        please reach out to us.
      </p>

      <p className="mb-4">
        You can contact us via email:
      </p>

     <p className="font-medium mb-6">
        📧{" "}
         <a
         href="https://mail.google.com/mail/?view=cm&fs=1&to=swiftcalcfy@gmail.com&su=Feedback%20for%20Swiftcalcfy"
  target="_blank"
  rel="noopener noreferrer"
  className="font-medium text-indigo-600 hover:underline"
      >
        swiftcalcfy@gmail.com
      </a>
      </p>
      <p>
        We aim to respond to all inquiries as quickly as possible. Please note
        that we do not provide personalized financial, medical, or legal advice.
      </p>
    </main>
  );
}
