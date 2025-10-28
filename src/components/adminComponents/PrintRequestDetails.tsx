import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { StatusBadge } from "@/components/adminComponents/StatusBadge";

interface PrintRequestDetailsProps {
  request: {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    adresse: string;
    date: string;
    addNote: string;
    status: "new" | "contacted" | "completed" | "rejected";
  };
  internalNotes?: string;
  product: string;
}

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 16,
    color: "#666",
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4",
    paddingBottom: 2,
  },
  label: {
    fontWeight: "bold",
  },
  row: {
    marginBottom: 4,
  },
  status: {
    marginTop: 4,
    marginBottom: 12,
  },
  footer: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

// Component rendering the PDF document
const RequestDocument = ({ request, internalNotes, product }: PrintRequestDetailsProps) => (
  
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Purchase Request #{request.id}</Text>
      <Text style={styles.subtitle}>Submitted on {request.date}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Client Information</Text>
        <View style={styles.status}>
          <StatusBadge status={request.status} />
        </View>
        <Text style={styles.row}>
          <Text style={styles.label}>Name: </Text>
          {request.name}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Phone: </Text>
          {request.phoneNumber}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Email: </Text>
          {request.email}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Address: </Text>
          {request.adresse}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Request Details</Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Product: </Text>
          {product}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Client Notes: </Text>
          {request.addNote || "—"}
        </Text>
        {internalNotes && (
          <Text style={styles.row}>
            <Text style={styles.label}>Internal Notes: </Text>
            {internalNotes}
          </Text>
        )}
      </View>

      <Text style={styles.footer}>
        Groupe MTFC Admin Panel - Printed on {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

export function PrintRequestDetails({ request, internalNotes , product}: PrintRequestDetailsProps) {
  return (
    <PDFDownloadLink
      document={<RequestDocument request={request} internalNotes={internalNotes} product={product}/>}
      fileName={`purchase-request-${request.id}.pdf`}
      style={{ textDecoration: "none" }}
    >
      {({ loading }) =>
        loading ? (
          <Button variant="outline" disabled>
            Preparing PDF...
          </Button>
        ) : (
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Download PDF
          </Button>
        )
      }
    </PDFDownloadLink>
  );
}
